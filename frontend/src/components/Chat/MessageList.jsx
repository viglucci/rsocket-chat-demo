import avatar from "../../assets/avatar.jpg";
import {timeFromMillis} from "../../util/date";

export default function MessageList(props) {
    return (
        <div className="flex-1 flex flex-col bg-white overflow-hidden">

            <div className="border-b flex px-6 py-2 items-center flex-none">
                <div className="flex flex-col">
                    <h3 className="text-gray-900 mb-1 font-extrabold">#general</h3>
                    <div className="text-gray-800 text-sm truncate">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </div>
                </div>
            </div>

            <div className="px-6 py-4 flex-1 overflow-y-scroll">
                {props.messages.map((message) => {
                    return (
                        <div className="flex items-start mb-4 text-sm" key={message.id}>
                            <img src={avatar}
                                 className="w-10 h-10 rounded mr-3"
                                 alt="avatar image" />
                            <div className="flex-1 overflow-hidden">
                                <div>
                                    <span className="font-bold mr-2">{message.username}</span>
                                    <span className="text-gray text-xs">{timeFromMillis(message.timestampEpochMillis)}</span>
                                </div>
                                <p className="text-black leading-normal">{message.message}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="pb-6 px-4 flex-none pt-4 border-t">
                <div className="flex rounded-lg border-2 border-gray overflow-hidden">
                    <span className="text-3xl text-gray border-r-2 border-gray p-2">
                        <svg className="fill-current h-6 w-6 block" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 20 20"><
                            path
                            d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z"/>
                        </svg>
                    </span>
                    <form className="w-full" onSubmit={props.onFormSubmit}>
                        <input
                            name="message"
                            type="text"
                            className="w-full h-full px-4"
                            placeholder="Message #general"/>
                    </form>
                </div>
            </div>
        </div>
    );
}
