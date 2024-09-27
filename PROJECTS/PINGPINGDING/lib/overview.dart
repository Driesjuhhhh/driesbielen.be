import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:intl/intl.dart';

class Overview extends StatefulWidget {
  final bool isDarkMode;
  final Function toggleTheme;

  const Overview({Key? key, required this.isDarkMode, required this.toggleTheme}) : super(key: key);

  @override
  _OverviewState createState() => _OverviewState();
}

class _OverviewState extends State<Overview> {
  final storage = FlutterSecureStorage();
  List<Map<String, dynamic>> transactions = [];

  @override
  void initState() {
    super.initState();
    _fetchTransactions();
  }

  Future<void> _fetchTransactions() async {
    String? token = await storage.read(key: 'auth_token');

    if (token == null) {
      print('No token found');
      return;
    }

    final transactionsResponse = await http.post(
      Uri.parse('https://pingping.driesbielen.online/transactions'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'cookie': {'token': token},
        'fromDate': '2020-01-01T14:27:01.498Z',
      }),
    );

    if (transactionsResponse.statusCode == 200) {
      final transactionsData = json.decode(transactionsResponse.body);
      setState(() {
        transactions = List<Map<String, dynamic>>.from(transactionsData['transactions'] ?? []);
      });
    } else {
      print('Failed to fetch transactions: ${transactionsResponse.reasonPhrase}');
    }
  }

  Color _getAmountColor(double amount) {
    return amount < 0 ? Colors.red : Colors.green;
  }

  String _formatDate(String dateString) {
    DateTime dateTime = DateTime.parse(dateString);
    return DateFormat('dd/MM/yyyy').format(dateTime); // Format to DD/MM/YYYY
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.background,
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Uw transacties:',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: widget.isDarkMode ? Colors.white : Colors.black,
              ),
            ),
            const SizedBox(height: 20),
            Expanded(
              child: ListView.builder(
                itemCount: transactions.length,
                itemBuilder: (context, index) {
                  final transaction = transactions[index];
                  return _transactionItem(
                    context,
                    transaction['location'] ?? 'Unknown Location',
                    _formatDate(transaction['date']),
                    transaction['price'] ?? 0.0,
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _transactionItem(BuildContext context, String location, String date, double amount) {
    Color amountColor = _getAmountColor(amount);
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8.0),
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surface,
        borderRadius: BorderRadius.circular(32.0),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                location,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 22,
                ),
              ),
              Text(
                date,
                style: const TextStyle(
                  color: Color(0xFF9A9A9A),
                  fontSize: 16,
                ),
              ),
            ],
          ),
          Text(
            '€ ${amount.toStringAsFixed(2)}',
            style: TextStyle(
              color: amountColor,
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}
