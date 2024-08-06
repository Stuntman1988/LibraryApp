package org.example.backendlibrary.config;

import org.example.backendlibrary.entity.*;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private String theAllowedOrigins = "http://localhost:5173";

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config,
                                                     CorsRegistry cors) {

        HttpMethod[] theUnsupportedMethods = { HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.PATCH };

        config.exposeIdsFor(Book.class);
        config.exposeIdsFor(Review.class);
        config.exposeIdsFor(User.class);
        config.exposeIdsFor(Checkout.class);
        config.exposeIdsFor(History.class);
        config.exposeIdsFor(Message.class);

        disableHttpMethods(Book.class, config, theUnsupportedMethods);
        disableHttpMethods(Review.class, config, theUnsupportedMethods);
        disableHttpMethods(User.class, config, theUnsupportedMethods);
        disableHttpMethods(Checkout.class, config, theUnsupportedMethods);
        disableHttpMethods(History.class, config, theUnsupportedMethods);
        disableHttpMethods(Message.class, config, theUnsupportedMethods);

        /* Configure CORS Mapping */
        cors.addMapping(config.getBasePath() + "/**")
                .allowedOrigins(theAllowedOrigins);

    }

    private void disableHttpMethods(Class theClass,
                                    RepositoryRestConfiguration config,
                                    HttpMethod[] theUnsupportedMethods) {

        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) ->
                        httpMethods.disable(theUnsupportedMethods))
                .withCollectionExposure((metdata, httpMethods) ->
                        httpMethods.disable(theUnsupportedMethods));
    }

}
