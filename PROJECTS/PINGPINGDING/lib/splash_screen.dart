import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'login.dart'; // Import the login screen

class SplashScreen extends StatefulWidget {
  final Function toggleTheme; // Add toggleTheme parameter

  const SplashScreen({super.key, required this.toggleTheme});

  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    Timer(const Duration(seconds: 3), () {
      // Navigate to login page after 3 seconds
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(
          builder: (context) => LoginScreen(toggleTheme: widget.toggleTheme, isDarkMode: true), // Pass the theme toggle and isDarkMode
        ),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF222233),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SvgPicture.asset(
              'assets/images/pingding_splash.svg', // Replace with your SVG file path
              width: 300,
            ),
            const SizedBox(height: 20),
            const Text(
              'PingPingDing',
              style: TextStyle(
                fontSize: 24,
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
