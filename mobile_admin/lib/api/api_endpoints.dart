class ApiEndpoints {
  // Base URL for your API
  static const String baseUrl = 'http://192.168.131.9:4000/';

  // Authentication Endpoints
  static const String login = '$baseUrl/admin/api/login';
  static const String createAdmin = '$baseUrl/admin/api/create_admin';
  static const String authCheck = '$baseUrl/admin/api/check-auth';
  static const String getInbox = '$baseUrl/admin/api/inbox_get';
  static const String addClint = '$baseUrl/admin/api/add_clint';
  static const String addBlog = '$baseUrl/admin/api/add_blog';
  static const String addTestimonal = '$baseUrl/admin/api/add_testimonial';

  // Other Endpoints
  static const String getClint = '$baseUrl/admin/api/get_clint';
  static const String getBlog = '$baseUrl/admin/api/get_blog';
}
