import React from "react";

// declare var AppConfigBridge: any;
export var AppConfig = {} ; //AppConfigBridge;

export const AppState: IAppState = {
    instance: 1,
    loginState: "Loading",
    user: {},
    //filesToUpload: null,
    showPhotoLightbox: 0,
    showLoginLightbox: false,
    showRegisterLightbox: false,
    mobileMenu: false,
    //commentEraseId: null,
    snackbarMessages: [],


}

export interface IAppState {
    instance?: number;
    loginState?: "Loading" | "Logged" | "Public";
    user?: IUser | {};
    // filesToUpload: any;
    showPhotoLightbox: number;
    showLoginLightbox: boolean;
    showRegisterLightbox: boolean;
    mobileMenu: boolean;
    // commentEraseId: number | null;
    snackbarMessages: any[];
}

export interface IUser {
    id: number
    name: string
    fullname: string
    role: string
}

export const AppContext = React.createContext(null);