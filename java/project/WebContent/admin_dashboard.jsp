<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.travelo.util.DBConnection" %>
<%@ page import="java.sql.*" %>
<%
    // Ensure only Admin can access
    com.travelo.model.User currentUser = (com.travelo.model.User) session.getAttribute("user");
    if(currentUser == null || !currentUser.getRole().equals("ADMIN")) {
        response.sendRedirect("login.jsp?error=Admin Access Required");
        return;
    }
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Dashboard - TRAVELO</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

    <%@ include file="navbar.jsp" %>

    <div class="container mt-5">
        <h2 class="mb-4 fw-bold text-danger">🛡️ Admin Dashboard</h2>

        <div class="card shadow-sm border-0">
            <div class="card-body p-4">
                <h4 class="mb-3">Recent Bookings</h4>
                <div class="table-responsive">
                    <table class="table table-hover table-striped">
                        <thead class="table-dark">
                            <tr>
                                <th>Booking ID</th>
                                <th>User ID</th>
                                <th>Type</th>
                                <th>Ref ID</th>
                                <th>Total Price</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <%
                                try (Connection conn = DBConnection.getConnection();
                                     PreparedStatement ps = conn.prepareStatement("SELECT * FROM bookings ORDER BY id DESC LIMIT 20");
                                     ResultSet rs = ps.executeQuery()) {
                                     
                                    while(rs.next()) {
                            %>
                            <tr>
                                <td>#<%= rs.getInt("id") %></td>
                                <td>User <%= rs.getInt("user_id") %></td>
                                <td><span class="badge bg-primary"><%= rs.getString("booking_type") %></span></td>
                                <td><%= rs.getInt("reference_id") %></td>
                                <td class="fw-bold">₹<%= rs.getDouble("total_price") %></td>
                                <td><span class="badge bg-success"><%= rs.getString("status") %></span></td>
                                <td><%= rs.getTimestamp("booking_date") %></td>
                            </tr>
                            <%
                                    }
                                } catch(Exception e) {
                                    out.println("<tr><td colspan='7'>Error loading bookings</td></tr>");
                                }
                            %>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

</body>
</html>
