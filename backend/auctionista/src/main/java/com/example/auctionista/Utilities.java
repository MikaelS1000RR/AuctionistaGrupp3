package com.example.auctionista;


import java.lang.reflect.Field;
import java.util.Map;

public class Utilities {

    // helper method to set private field values
    public static void updatePrivateFields(Object object, Map values) {
        // loop through keys in values map
        for(Object key : values.keySet()) {
            try {
                // getDeclaredField returns a field from a class even if it's private
                Field field = object.getClass().getDeclaredField((String) key);
                // enable setting value of a private variable
                field.setAccessible(true);

                // set the field value in the object with value from the Map
                field.set(object, values.get(key));
            } catch (NoSuchFieldException | IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }

}
