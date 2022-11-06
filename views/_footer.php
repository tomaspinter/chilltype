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
                <button id="zen_mode_switch"
                        onclick="View.toggle.zen_mode();"
                        >zen mode
                </button>
                <button id="stats_switch"
                        onclick="View.toggle.id('stats');"
                        >stats
                </button>
            </footer>
        </div> 
    </div>
</div> <!-- end of #content -->
</body>
</html>