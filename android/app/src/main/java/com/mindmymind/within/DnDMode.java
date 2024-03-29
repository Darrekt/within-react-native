package com.mindmymind.within;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.app.NotificationManager;
import android.content.Intent;
import android.os.Build;
import android.provider.Settings;
import android.util.Log;

import androidx.core.app.ActivityCompat;


public class DnDMode extends ReactContextBaseJavaModule {
    private NotificationManager notificationManager;
    private boolean dndSupported;
    DnDMode(ReactApplicationContext context) {
        super(context);
        notificationManager = (NotificationManager) context.getApplicationContext().getSystemService(context.NOTIFICATION_SERVICE);
        dndSupported = Build.VERSION.SDK_INT >= Build.VERSION_CODES.M;
    }

    @ReactMethod
    public void getDnDPermission() {
        if (dndSupported){
            if(!notificationManager.isNotificationPolicyAccessGranted()) {
                Intent i = new Intent(Settings.ACTION_NOTIFICATION_POLICY_ACCESS_SETTINGS);
                i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                getReactApplicationContext().startActivity(i);
            }
    }
        else {
            Log.d("DnDMode", "DnD Mode not supported.");
        }
    }

    @ReactMethod
    public void setDNDMode(boolean turnOn) {
        getDnDPermission();
        if (turnOn) notificationManager.setInterruptionFilter(NotificationManager.INTERRUPTION_FILTER_PRIORITY);
        else notificationManager.setInterruptionFilter(NotificationManager.INTERRUPTION_FILTER_ALL);
        Log.d("DnDMode", "DnD Mode set.");
    }

    @Override
    public String getName() {
        return "DnDMode";
    }
}
