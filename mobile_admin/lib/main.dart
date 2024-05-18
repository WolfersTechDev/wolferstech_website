import 'package:flutter/material.dart';
import 'package:mobile_admin/screen/homescreen.dart';
import 'package:mobile_admin/screen/loginscreen.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:mobile_admin/utils/handleauth.dart';

const storage = FlutterSecureStorage();

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await AuthUtil.init();
  final bool isLoggedIn = await AuthUtil.isLoggedIn();
  runApp(MyApp(isLoggedIn: isLoggedIn));
}

class MyApp extends StatelessWidget {
  final bool isLoggedIn;
  const MyApp({super.key, required this.isLoggedIn});

  // This widget ipos the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: isLoggedIn ? const HomeScreen() : const LoginScreen(),
    );
  }
}
