import Contacts from './components/Contacts';

import { useOnlineContact } from '../../Contexts/OnlineContactProvider';

import './Sidebar.css'

function Sidebar() {

    const { onlineContact } = useOnlineContact();

    return (
        <div className='sidebar'>
            <h2 className='username'>
                { onlineContact.contactName }
            </h2>
            <Contacts />
        </div>
    )
}

export default Sidebar
