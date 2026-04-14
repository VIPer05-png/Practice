package com.travelo.dao;

import com.travelo.util.DBConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;

public class BookingDao {

    public boolean createBooking(int userId, String type, int referenceId, double totalPrice) {
        String sql = "INSERT INTO bookings (user_id, booking_type, reference_id, total_price) VALUES (?, ?, ?, ?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
             
            ps.setInt(1, userId);
            ps.setString(2, type);
            ps.setInt(3, referenceId);
            ps.setDouble(4, totalPrice);
            
            return ps.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}
