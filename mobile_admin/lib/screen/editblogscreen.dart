import 'package:flutter/material.dart';

class EditBlogScreen extends StatefulWidget {
  const EditBlogScreen({super.key});

  @override
  State<EditBlogScreen> createState() => _EditBlogScreenState();
}

class _EditBlogScreenState extends State<EditBlogScreen> {
  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text(
        "Edit Blog Screen",
        style: TextStyle(
          fontWeight: FontWeight.w900,
          fontSize: 28,
        ),
      ),
    );
  }
}