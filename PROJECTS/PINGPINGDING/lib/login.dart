import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart'; // Import the flutter_svg package
import 'package:http/http.dart' as http; // Import the http package
import 'dart:convert'; // For json encoding
import 'home.dart'; // Import the HomePage
import 'package:flutter_secure_storage/flutter_secure_storage.dart'; // Import the secure storage package

class LoginScreen extends StatefulWidget {
  final bool isDarkMode; // Add this parameter
  final Function toggleTheme; // Function to toggle the theme

  const LoginScreen({super.key, required this.isDarkMode, required this.toggleTheme});

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  String? errorMessage; // To display an error message
  final FlutterSecureStorage _secureStorage = const FlutterSecureStorage(); // Create a secure storage instance

  Future<void> login() async {
    final String username = _usernameController.text;
    final String password = _passwordController.text;

    // Prepare the request body
    final Map<String, String> body = {
      "username": username,
      "password": password,
    };

    try {
      // Make the POST request to the API
      final response = await http.post(
        Uri.parse('https://pingping.driesbielen.online/'), // Your API URL
        headers: {"Content-Type": "application/json"},
        body: jsonEncode(body),
      );

      if (response.statusCode == 200) {
        // Parse the token from the response body
        final Map<String, dynamic> responseBody = jsonDecode(response.body);
        final String token = responseBody['token'];

        // Store the token in secure storage
        await _secureStorage.write(key: 'auth_token', value: token);

        // Navigate to the HomePage
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (context) => HomePage(isDarkMode: widget.isDarkMode, toggleTheme: widget.toggleTheme),
          ),
        );
      } else {
        // If there is an error, capture the error message returned by the API
        setState(() {
          errorMessage = '${response.body}}';
        });
      }
    } catch (e) {
      // Handle connection or other errors
      setState(() {
        errorMessage = 'An error occurred: $e }';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.background,
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Center(
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Positioned Icon for theme toggle
                Align(
                  alignment: Alignment.topLeft,
                  child: IconButton(
                    icon: Icon(
                      widget.isDarkMode ? Icons.light_mode : Icons.dark_mode,
                      color: widget.isDarkMode ? Colors.white : Colors.black, // Change icon color based on theme
                    ),
                    onPressed: () {
                      widget.toggleTheme(); // Call the function to toggle theme
                    },
                  ),
                ),
                const SizedBox(height: 20), // Add space below the icon

                // SVG File Replacement
                SvgPicture.asset(
                  'assets/images/pingding_splash.svg', // Path to your SVG file
                  height: 200, // Adjust height as needed
                  color: widget.isDarkMode ? Colors.white : Colors.black, // Change color based on theme if needed
                ),
                const SizedBox(height: 30), // Add space below the SVG

                // Username TextField styled like in HomePage
                TextField(
                  controller: _usernameController, // Attach controller for username
                  decoration: InputDecoration(
                    labelText: 'Username',
                    labelStyle: TextStyle(color: widget.isDarkMode ? Colors.white : Colors.black), // Change label color
                    fillColor: Theme.of(context).colorScheme.surface, // Set fill color to match HomePage
                    filled: true,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(32.0), // Rounded corners to match HomePage
                      borderSide: BorderSide.none,
                    ),
                  ),
                  style: TextStyle(color: widget.isDarkMode ? Colors.white : Colors.black), // Change input text color
                ),
                const SizedBox(height: 20),

                // Password TextField styled like in HomePage
                TextField(
                  controller: _passwordController, // Attach controller for password
                  obscureText: true,
                  decoration: InputDecoration(
                    labelText: 'Password',
                    labelStyle: TextStyle(color: widget.isDarkMode ? Colors.white : Colors.black), // Change label color
                    fillColor: Theme.of(context).colorScheme.surface, // Set fill color to match HomePage
                    filled: true,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(32.0), // Rounded corners to match HomePage
                      borderSide: BorderSide.none,
                    ),
                  ),
                  style: TextStyle(color: widget.isDarkMode ? Colors.white : Colors.black), // Change input text color
                ),
                const SizedBox(height: 20),

                // Display error message in an error box if any
                if (errorMessage != null) ...[
                  Container(
                    padding: const EdgeInsets.all(12.0),
                    decoration: BoxDecoration(
                      color: Colors.red[100], // Light red background for error
                      borderRadius: BorderRadius.circular(8.0), // Rounded corners for the box
                      border: Border.all(color: Colors.red), // Red border to make it stand out
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.error, color: Colors.red), // Error icon
                        const SizedBox(width: 10), // Space between icon and text
                        Expanded(
                          child: Text(
                            errorMessage!,
                            style: const TextStyle(color: Colors.red), // Red text for error message
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 20),
                ],

                // Login Button
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: login, // Call the login function when button is pressed
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF4B4B99),
                      padding: const EdgeInsets.symmetric(vertical: 15),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(32.0), // Rounded corners to match HomePage
                      ),
                    ),
                    child: const Text(
                      'Login',
                      style: TextStyle(color: Colors.white),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
