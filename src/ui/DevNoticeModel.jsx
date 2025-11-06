import React, { useState, useEffect } from "react";

const DevNoticeModal = () => {
    const STORAGE_KEY = "dev_notice_hidden";
    const [visible, setVisible] = useState(false);
    const [dontShow, setDontShow] = useState(false);
    useEffect(() => {
        const hidden = localStorage.getItem(STORAGE_KEY);
        if (!hidden) {
            setVisible(true);
        }
    }, []);

    const handleClose = () => {
        // if (dontShow) {
            localStorage.setItem(STORAGE_KEY, "1");
        // }
        setVisible(false);
    };

    if (!visible) return null;
    return (
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 "
            role="dialog"
            aria-modal="true"
            aria-label="Development notice"
            onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl w-[90%] max-w-md relative text-center">
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 rounded-full px-2"
                    aria-label="Close"
                >
                    ✕
                </button>

                <div className="flex flex-col items-center gap-3">
                    {/* <div className="w-20 h-20 dark:bg-yellow-900/30 flex items-center justify-center rounded-full">
                        <div class="tenor-gif-embed " data-postid="7798014736522551104" data-share-method="host" data-aspect-ratio="1" data-width="100%">
                            <a href="https://tenor.com/view/fire-emblem-maid-fire-emblem-fire-emblem-fates-maid-maid-girl-gif-7798014736522551104">
                                Fire Emblem Maid Fire Emblem Sticker
                            </a>
                            from <a href="https://tenor.com/search/fire+emblem+maid-stickers">
                                Fire Emblem Maid Stickers
                            </a>
                        </div>
                        <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
                    </div> */}
                    <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center bg-[var(--color-text)] ">
                        <img
                            src="https://media1.tenor.com/m/PtJdGmm8Mi4AAAAC/ram-rezero.gif"
                            alt="Fire Emblem Maid"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        Site Under Development
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                        We're still building this site — some features may not work yet.
                    </p>

                    <div className="flex items-center justify-center gap-2 mt-4">
                        <input
                            type="checkbox"
                            id="dontShow"
                            checked={dontShow}
                            onChange={(e) => setDontShow(e.target.checked)}
                        />
                        <label
                            htmlFor="dontShow"
                            className="text-sm text-gray-600 dark:text-gray-300"
                        >
                            Don’t show this again
                        </label>
                    </div>

                    <button
                        onClick={handleClose}
                        className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                    >
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DevNoticeModal;
