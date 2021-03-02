package com.darrekt.Sage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.util.Log;

public class DnDMode extends ReactContextBaseJavaModule {
    DnDMode(ReactApplicationContext context) {
        super(context);
    }

    @ReactMethod
    public void turnOnDND() {
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
