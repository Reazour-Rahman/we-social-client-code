import { Alert, AlertIcon, Text } from "@chakra-ui/react";
import React from "react";

const Chat = () => {
  return (
    <div >
      <Alert status="warning" style={{height:"50vh"}}>
        <AlertIcon />
        <div >
          <Text>
            Hello there... As soon as possible are trying to implement messaging
            feature in our site. Yes! It needs some delay but wait for this
            feature. This feature is gonna very cool , super user experience and
            super fast. Please, stay with us and join in our community.
            <span className="d-block fw-bold">We social Authority</span>
          </Text>
          
        </div>
      </Alert>
    </div>
  );
};

export default Chat;
