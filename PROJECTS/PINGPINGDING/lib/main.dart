import 'package:flutter/material.dart';
import 'splash_screen.dart'; // Import the splash screen
import 'login.dart'; // Import the login screen

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  bool _isDarkMode = true; // Initial theme set to dark mode

  void _toggleTheme() {
    setState(() {
      _isDarkMode = !_isDarkMode;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PingPingDing',
      theme: ThemeData(
        // Set brightness explicitly
        colorScheme: ColorScheme(
          brightness: _isDarkMode ? Brightness.dark : Brightness.light, // Specify brightness here
primary: _isDarkMode ? const Color(0xFF4B4B99) : Colors.blue,
          secondary: Colors.grey,
          surface: _isDarkMode ? const Color(0xFF4D4D6E) : const Color(0xFF222233),
          background: _isDarkMode ? const Color(0xFF222233) : const Color(0xFF4D4D6E),
          error: Colors.red,
          onPrimary: Colors.white,
          onSecondary: Colors.black,
          onSurface: Colors.black,
          onBackground: Colors.black,
          onError: Colors.white,
        ),
        useMaterial3: true,
      ),
      home: SplashScreen(toggleTheme: _toggleTheme), // Pass the theme toggle function
    );
  }
}
