import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ONBOARDING_STATUS_KEY } from "../util/constants";

/** 
 * Use this hook anywhere in the app where an `Action` needs to be dispatched to the store.
 * `useAppDispatch` is simply a wrapping of `useDispatch` with the provided type annotation allows the 
 * shape of the store to display through the in-editor tooling.  See this 
 * [link](https://react-redux.js.org/tutorials/typescript-quick-start) for more information. */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/** 
 * Use this hook in conjunction with a `selector` to slice a part of the App's state for use in a component.
 * The resultant data slice will be stateful and will trigger re-renders if updated.
 * `useAppSelector` is simply a wrapping of `useSelector` with the provided type annotation allows the 
 * shape of the store to display through the in-editor tooling.  See this 
 * [link](https://react-redux.js.org/tutorials/typescript-quick-start) for more information. */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const OnboardingContext = React.createContext<{
  setOnboarded: ((status: boolean) => Promise<void>) | null;
}>({ setOnboarded: null });

export const useOnboardingState = (): [
  boolean,
  (status: boolean) => Promise<void>
] => {
  const [onboarded, setOnboarded] = React.useState(true);
  const onboardingSetter = async (status: boolean) => {
    try {
      await AsyncStorage.setItem(ONBOARDING_STATUS_KEY, JSON.stringify(status));
      setOnboarded(status);
    } catch (e) {
      console.log("Issue with Async storage onboarding completion");
      setOnboarded(false);
    }
  };

  React.useEffect(() => {
    const getOnboardingStatus = async () => {
      let status = true;
      try {
        status =
          (await AsyncStorage.getItem(ONBOARDING_STATUS_KEY)) === "true"
            ? true
            : false;
      } catch (e) {
        console.log("Onboarding status issue");
        status = false;
      }
      setOnboarded(status);
    };
    getOnboardingStatus();
  }, [onboarded]);

  return [onboarded, onboardingSetter];
};
