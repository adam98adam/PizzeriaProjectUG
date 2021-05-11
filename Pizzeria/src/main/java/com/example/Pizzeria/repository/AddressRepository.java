package com.example.Pizzeria.repository;

import com.example.Pizzeria.models.Address;
import com.example.Pizzeria.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address,Integer> {
    //@Query(value = "SELECT * FROM User_Address u WHERE u.user_id = :id",nativeQuery = true)
    //Optional<Address> findAddressByUserId(@Param("id") Integer id);
    Optional<Address> findByUser_Id(@Param("id") Integer id);

}
