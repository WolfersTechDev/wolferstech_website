import 'package:flutter/material.dart';
import 'package:mobile_admin/NavBar/navbar.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const NavBar(),
      appBar: AppBar(
        title: const Text("Wolferstech"),
        backgroundColor: Colors.blue,
      ),
    );
  }
}
