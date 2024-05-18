import 'package:mobile_admin/main.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class AuthUtil {
  static late SharedPreferences _prefs;

  static Future<void> init() async {
    _prefs = await SharedPreferences.getInstance();
  }

  static Future<bool> isLoggedIn() async {
    // ignore: await_only_futures
    final bool? isLoggedIn = await _prefs.getBool('isLoggedIn');
    return isLoggedIn ?? false;
  }

  static Future<String?> getAuthToken() async {
    return await storage.read(key: 'jwt_token');
  }

  static Future<void> setisloggedintrue() async {
    await _prefs.setBool('isLoggedIn', true);
  }

  static Future<void> logout() async {
    await _prefs.setBool('isLoggedIn', false);
    await storage.delete(key: 'jwt_token');
  }

  Future<bool> checkAuthentication(String jwtToken) async {
    const String apiUrl = 'http://localhost:4000/'; // Replace with your API URL

    try {
      final response = await http.get(
        Uri.parse(
            '$apiUrl/admin/api/check-auth'), // Replace with your protected route URL
        headers: {
          'Authorization': jwtToken, // Send JWT token in the headers
          'Content-Type': 'application/json',
        },
      );

      if (response.statusCode == 200) {
        // The request was successful, and the user is authenticated
        return true;
      } else if (response.statusCode == 401) {
        // The user is not authenticated (token is invalid or expired)
        return false;
      } else {
        // Handle other HTTP status codes as needed
        return false;
      }
    } catch (e) {
      // Handle any errors that occur during the HTTP request
      print('Error: $e');
      return false;
    }
  }
}
