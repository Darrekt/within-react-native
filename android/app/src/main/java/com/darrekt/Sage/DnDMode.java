package com.darrekt.Sage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.util.Log;
import android.service.notification;
import java.util.Map;
import java.util.HashMap;


public class DnDMode extends ReactContextBaseJavaModule {
    DnDMode(ReactApplicationContext context) {
        super(context);
    }

    @ReactMethod
    public void turnOnDND() {
        NotificationManager mNotificationManager = (NotificationManager) getActivity().getSystemService(Context.NOTIFICATION_SERVICE);

        // Check if the notification policy access has been granted for the app.
        if (!mNotificationManager.isNotificationPolicyAccessGranted()) {
            Intent intent = new Intent(android.provider.Settings.ACTION_NOTIFICATION_POLICY_ACCESS_SETTINGS);
            startActivity(intent);
        }
        
        Log.d("DnDMode", "DnD Mode turned on.");
    }

    @ReactMethod
    public void turnOffDnD() {
        Log.d("DnDMode", "DnD Mode turned off.");
    }

    @Override
    public String getName() {
        return "DnDMode";
    }
}
