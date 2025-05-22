import { For, Show } from "solid-js";

type chatProps = {
  items: [];
  onUserClicked: (item: object) => void;
  messages: [];
  userId: number;
  user: { name?: string };
  newMessage: string;
  newRecievedMessage: string;
  setForm: (event: Event) => void;
  setNewMessage: (item: string) => void;
};

function CreaterChat(props: chatProps) {
  const formLocal = (event: Event) => {
    event.preventDefault();
    props.setForm(event);
  };

  return (
    <div class="flex h-screen w-full max-w-screen-2xl m-auto overflow-hidden">
      {/* Sidebar */}
      <aside class="w-full lg:w-1/4 bg-white dark:bg-gray-900 rounded-lg mr-5 shadow-md">
        <div class="h-full flex flex-col">
          <div class="flex p-10">
            <div class="mb-4 text-3xl font-semi-bold text-gray-900 dark:text-white">
              Chat
            </div>
          </div>

          <ul class="list-decimal list-inside">
            <For each={props.items}>
              {(item) => (
                <li
                  onclick={() => props.onUserClicked(item.user)}
                  class="cursor-pointer px-4 py-2 rounded-lg hover:bg-indigo-100 text-white"
                >
                  {item.user.name}
                </li>
              )}
            </For>
          </ul>
        </div>
      </aside>

      {/* Chat section */}
      <section class="relative max-h h-full bg-white rounded-lg w-full flex flex-col dark:bg-900 lg:flex">
        <div class="w-full border bg-black font-extrabold text-white text-center">
          {props.user.name}
        </div>

        <div class="flex-1 overflow-y-scroll p-5 space-y-5">
          <For each={props.messages}>
            {(item) => (
              <div class={`flex ${item.id === props.userId ? 'justify-start' : 'justify-end'}`}>
                                     <div class={`p-4 rounded-lg max-w-xl ${item.id===props.userId? 'bg-indigo-800 text-white rounded-l-lg': 'bg-gray-100 text-black rouned-r-lg'}`}>

                  <span class="text-sm">
                    {item.id === props.userId
                      ? `${props.user.name}: ${item.message}`
                      : `You: ${item.message}`}
                  </span>
                </div>
              </div>
            )}
          </For>
        </div>

        <Show when={props.messages}>
          <div class="grid grid-rows-2 p-4">
            <form onSubmit={formLocal} class="flex items-center space-x-4">
              <input
                onChange={(e) => props.setNewMessage(e.currentTarget.value)}
                value={props.newMessage}
                placeholder="Type a message"
                type="text"
                class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 rounded-full py-3 px-4 border"
              />
              <button
                class="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-black bg-indigo-300"
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
        </Show>
      </section>
    </div>
  );
}

export default CreaterChat;