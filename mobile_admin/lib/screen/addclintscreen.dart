import 'package:flutter/material.dart';

class AddClintScreen extends StatefulWidget {
  const AddClintScreen({super.key});

  @override
  State<AddClintScreen> createState() => _AddClintScreenState();
}

class _AddClintScreenState extends State<AddClintScreen> {
  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text(
        "Add Clint Screen",
        style: TextStyle(
          fontWeight: FontWeight.w900,
          fontSize: 28,
        ),
      ),
    );
  }
}