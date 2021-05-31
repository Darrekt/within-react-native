package com.darrekt.Sage;
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
    public void turnOnDND() {
        if ( Build.VERSION.SDK_INT >= Build.VERSION_CODES.M ){
            if(!notificationManager.isNotificationPolicyAccessGranted()) {
                getReactApplicationContext().startActivity(new Intent(Settings.ACTION_NOTIFICATION_POLICY_ACCESS_SETTINGS));
//                ActivityCompat.requestPermissions(Settings.ACTION_NOTIFICATION_POLICY_ACCESS_SETTINGS, [Settings.ACTION_NOTIFICATION_POLICY_ACCESS_SETTINGS], 0);
            }
            notificationManager.setInterruptionFilter(NotificationManager.INTERRUPTION_FILTER_PRIORITY);
            Log.d("DnDMode", "DnD Mode turned on.");
    }
        else {
            Log.d("DnDMode", "DnD Mode not supported.");
        }

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
