import 'package:mobile_admin/api/api_endpoints.dart';

import '../utils/handleauth.dart';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:mobile_admin/screen/homescreen.dart';

import '../main.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key}); // Correct way to access a shade of grey

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final useridController = TextEditingController();
  final passwordController = TextEditingController();

  Future<void> login() async {
    final String userid = useridController.text;
    final String password = passwordController.text;

    final response = await http.post(
      Uri.parse(
        ApiEndpoints.login,
      ), // Replace with your API endpoint
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'username': userid,
        'password': password,
      }),
    );

    if (response.statusCode == 200) {
      // Successful login, handle the response accordingly
      // ignore: unused_local_variable
      final data = json.decode(response.body);
      await storage.write(key: 'jwt_token', value: data["token"]);
      await AuthUtil.setisloggedintrue();

      // ignore: use_build_context_synchronously
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => const HomeScreen()),
      );
    } else {
      // Handle login failure, show error message to the user
      print('Login failed: ${response.statusCode}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFE0E0E0),
      body: SafeArea(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Image(
                image: AssetImage(
                  "assets/images/LOGO.png",
                ),
                height: 150,
                width: 150,
              ),
              //Todo Hello Again
              const Text(
                "Welcome To Admin Login",
                style: TextStyle(
                  fontFamily: "Roboto Mono",
                  fontWeight: FontWeight.bold,
                  fontSize: 24,
                ),
              ),
              const SizedBox(
                height: 50,
              ),

              //Todo Userid Textfield
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 25),
                child: Container(
                  decoration: BoxDecoration(
                    color: const Color(0xFFEEEEEE),
                    border: Border.all(
                      color: Colors.white,
                    ),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.only(left: 20.0),
                    child: TextField(
                      controller: useridController,
                      decoration: const InputDecoration(
                        hintText: "User ID",
                        hintStyle: TextStyle(
                          fontFamily: "Roboto Mono",
                        ),
                        border: InputBorder.none,
                      ),
                    ),
                  ),
                ),
              ),

              //Todo Password Textfield
              const SizedBox(
                height: 20,
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 25),
                child: Container(
                  decoration: BoxDecoration(
                    color: const Color(0xFFEEEEEE),
                    border: Border.all(
                      color: Colors.white,
                    ),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.only(left: 20.0),
                    child: TextField(
                      obscureText: true,
                      controller: passwordController,
                      decoration: const InputDecoration(
                        hintText: "Password",
                        hintStyle: TextStyle(
                          fontFamily: "Roboto Mono",
                        ),
                        border: InputBorder.none,
                      ),
                    ),
                  ),
                ),
              ),

              //Todo SigninButton
              const SizedBox(
                height: 20,
              ),
              SizedBox(
                width: 150,
                height: 50,
                child: ElevatedButton(
                  onPressed: login,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.blue, // Button background color
                    textStyle: const TextStyle(
                      fontSize: 18,
                    ), // Button text style
                  ),
                  child: const Text(
                    'Sigin',
                    style: TextStyle(
                      fontFamily: "Roboto Mono",
                      color: Colors.white,
                    ),
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
