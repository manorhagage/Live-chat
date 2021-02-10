import React ,{ useContext, useEffect, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';

const ConversationsContext = React.createContext();

export function useConversations()
{
    return useContext( ConversationsContext );
}

export function ConversationsProvider({ children }) {
    const [ conversations, setConversations ] = useLocalStorage('conversations', []);

    const addConversationToConversations = useCallback(( newConversation ) =>
    {
        setConversations([...conversations, newConversation]);
    },[ setConversations ]);

    const addMessageToConversation = useCallback(( conversationID, newMessage ) =>
    {
        setConversations(( prev ) =>
            prev.map(({ id, messages, ...rest }) => 
            ({
                ...rest, id,
                messages: id == conversationID ? ([ ...messages , ...newMessage ]) : messages
            }))
        );
    },[  setConversations ]);
    
    // create new conversation
    function createConversation( newConversation )
    {
        addConversationToConversations( newConversation );
    }

    // add message to conversation
    function addMessage( onlineContact, conversationID, content )
	{
		const newMessage = [{ from: onlineContact, content: content }];
        addMessageToConversation( conversationID, newMessage );
	}

    return (
        <ConversationsContext.Provider value={{ conversations, setConversations, createConversation, addMessage }}>
            { children }
        </ConversationsContext.Provider>
    )
}