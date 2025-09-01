import {StreamChat} from "stream-chat";
import {ENV} from "../config/env.js";

const streamClient = StreamChat.getInstance(ENV.STREAM_API_KEY, ENV.STREAM_API_SECRET_KEY)

export const upperStreamUser = async (userData) => {
    try {
        await streamClient.upsertUser(userData)
        console.log("stream user upserted succesfully:", userData.name);
        return userData
    } catch (error) {
        console.log("error upserting stream user:", error);
        
    }
}

export const deleteStreamUser = async (userId) => {
    try {
        await streamClient.deleteUser(userId);
        console.log("stream user deleted succesfully:", userId);
    } catch (error) {
        console.log("error deleting stream user:", error);        
    }
};

export const generateStreamToken = (userId) => {
    try {
        const userIdString = userId.toString();
        return streamClient.createToken(userIdString);
    } catch (error) {
        console.log("error generating the token:",error);
        return null;
    }
}