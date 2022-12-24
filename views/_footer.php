    <div id="footer_wrap">
        <div id="type_again_div" class="hidden">
            <button onclick="type_again();"
                    class="action_btn"
                    >type again
            </button>
            <button
                id="another_own_text_btn" 
                class="action_btn">
                    <a href="/type-your-own-text">another own text</a>
            </button>
            <button id="another_js_text_btn" 
                    class="action_btn"
                    onclick="reset_view_for_next_js_text();"
                    >next text
            </button>
        </div>
        <div>
            <footer id="footer">
                <button id="help_switch"
                        onclick="View.toggle.id('help_div');"
                        >help
                </button>
                <button id="zen_mode_switch"
                        onclick="View.toggle.zen_mode();"
                        >zen mode
                </button>
                
                <!-- blur() to prevent stats view toggle on 'space' press -->
                <button id="stats_switch"
                        onclick="View.toggle.id('stats');this.blur();"
                        >stats
                </button>
            </footer>
            <div id="help_div" class="hidden">
                <button id="close_help_btn" onclick="View.hide.id('help_div');">&#x2715</button>
                <ul>
                    <li>
                        <b>zen mode</b> hides all page elements but the text itself. <b>Click</b> anywhere or press <b>Escape</b> to exit
                    </li>
                    <li>
                        <b>stats</b> show your typing statistics regarding the current text
                    </li>
                    <li>
                        if you encounter a character in your text that cannot be typed on your keyboard, press the <b>Enter</b> key. (In fact <b>Enter</b> can supplement any character)
                    </li>
                    <li>
                        if you use your own text, note that new or empty lines are converted to a single space
                    </li>
                    
                </ul>
            </div>
        </div> 
    </div>
</div> <!-- end of #content -->
</body>
</html>