package io.peach.launch.dto;

import io.peach.launch.model.Activity;

/**
 * Created by ASUS on 2019/10/6.
 */
public class ActivityDTO {

    private Activity activity;
    private String token;

    public Activity getActivity() {
        return activity;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
