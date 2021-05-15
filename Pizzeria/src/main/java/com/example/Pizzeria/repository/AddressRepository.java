package com.example.Pizzeria.repository;

import com.example.Pizzeria.models.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address,Integer> {

    Optional<Address> findByUser_Id(@Param("id") Integer id);

}
