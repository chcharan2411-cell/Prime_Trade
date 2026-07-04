package com.primetrade.backend.service;

import java.util.List;
import org.springframework.data.domain.Page;
import com.primetrade.backend.dto.ProductRequest;
import com.primetrade.backend.dto.ProductResponse;

public interface ProductService {

    ProductResponse createProduct(ProductRequest request);

    List<ProductResponse> getAllProducts();

    ProductResponse getProductById(Long id);

    ProductResponse updateProduct(Long id, ProductRequest request);

    String deleteProduct(Long id);
    
    List<ProductResponse> searchProducts(String keyword);
    
    Page<ProductResponse> getProducts(
            int page,
            int size,
            String sortBy,
            String direction);
}