import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:intl/intl.dart'; // Ensure this line is included
import 'overview.dart'; // Import the Overview page

class HomePage extends StatefulWidget {
  final bool isDarkMode;
  final Function toggleTheme;

  const HomePage({Key? key, required this.isDarkMode, required this.toggleTheme}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final storage = FlutterSecureStorage();
  String name = 'Loading...';
  String balance = 'Loading...';
  List<Map<String, dynamic>> transactions = [];

  @override
  void initState() {
    super.initState();
    _fetchData();
  }

  Future<void> _fetchData() async {
    String? token = await storage.read(key: 'auth_token');

    if (token == null) {
      print('No token found');
      return;
    }

    final balanceResponse = await http.post(
      Uri.parse('https://pingping.driesbielen.online/purse'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'token': token}),
    );

    if (balanceResponse.statusCode == 200) {
      final balanceData = json.decode(balanceResponse.body);
      setState(() {
        name = balanceData['name'] ?? 'Unknown';
        balance = '€ ${balanceData['balance']?.toStringAsFixed(2) ?? '0.00'}';
      });
    } else {
      print('Failed to fetch balance: ${balanceResponse.reasonPhrase}');
    }

    final transactionsResponse = await http.post(
      Uri.parse('https://pingping.driesbielen.online/recent-transactions'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'token': token}),
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
            Align(
              alignment: Alignment.topLeft,
              child: IconButton(
                icon: Icon(
                  widget.isDarkMode ? Icons.light_mode : Icons.dark_mode,
                  color: widget.isDarkMode ? Colors.white : Colors.black,
                ),
                onPressed: () {
                  widget.toggleTheme();
                },
              ),
            ),
            const SizedBox(height: 80),
            Text(
              'Hallo, $name!',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: widget.isDarkMode ? Colors.white : Colors.black,
              ),
            ),
            const SizedBox(height: 10),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(vertical: 24.0, horizontal: 16.0),
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.surface,
                borderRadius: BorderRadius.circular(32.0),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Uw saldo is:',
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 10),
                  Text(
                    balance,
                    style: TextStyle(
                      fontSize: 72,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 60),
            Text(
              'Recente transacties:',
              style: TextStyle(
                fontSize: 20,
                color: widget.isDarkMode ? Colors.white : Colors.black,
              ),
            ),
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
            // Button to navigate to Overview page
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => Overview(isDarkMode: widget.isDarkMode, toggleTheme: widget.toggleTheme),
                  ),
                );
              },
              child: const Text('Go to Overview'),
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
