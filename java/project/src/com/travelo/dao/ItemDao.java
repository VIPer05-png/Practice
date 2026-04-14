package com.travelo.dao;

import com.travelo.model.Package;
import com.travelo.model.Hotel;
import com.travelo.util.DBConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class ItemDao {

    public List<Package> getAllPackages() {
        List<Package> list = new ArrayList<>();
        String sql = "SELECT * FROM packages";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
             
            while (rs.next()) {
                Package p = new Package();
                p.setId(rs.getInt("id"));
                p.setDestination(rs.getString("destination"));
                p.setDescription(rs.getString("description"));
                p.setPrice(rs.getDouble("price"));
                p.setDuration(rs.getString("duration"));
                list.add(p);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    public List<Hotel> getAllHotels() {
        List<Hotel> list = new ArrayList<>();
        String sql = "SELECT * FROM hotels";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
             
            while (rs.next()) {
                Hotel h = new Hotel();
                h.setId(rs.getInt("id"));
                h.setName(rs.getString("name"));
                h.setLocation(rs.getString("location"));
                h.setPricePerNight(rs.getDouble("price_per_night"));
                h.setImageUrl(rs.getString("image_url"));
                list.add(h);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }
}
