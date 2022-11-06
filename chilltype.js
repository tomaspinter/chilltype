const _id = (id) => document.getElementById(id);
const _tag = (tag) => Array.from(document.getElementsByTagName(tag));

// url dependent!
let url = window.location.pathname;
let IS_JS_TEXT = url.includes('type-random-text');
let IS_OWN_TEXT = url.includes('type-your-own-text');

let LETTER_COUNT = 1;
let CHECKED_LETTER_NUMBER = 1;
let KEY_PRESSES = 0;
let KEY_PRESSES_BEFORE = 0;
let MISTAKES = 0;
let TYPING_START_TIME;
let IS_ZEN_MODE = false;

const reset_counters_for_retype = () => {
    CHECKED_LETTER_NUMBER = 1;
    KEY_PRESSES = 0;
    KEY_PRESSES_BEFORE = 0;
    MISTAKES = 0;
    TYPING_START_TIME;
}

const reset_counters_for_next_text = () => {
    LETTER_COUNT = 1;
    reset_counters_for_retype();
}

const remove_multiple_spaces_from_text = (text) => {
    return text.replace(/\s{1,}/gm, ' ');
}

const text_to_single_letters = (text) => {
    text = remove_multiple_spaces_from_text(text);
    let text_arr = text.split('');
    let span_arr = [];
    text_arr.forEach(letter => {
        let span = `<span id='letter_${LETTER_COUNT}'>${letter}</span>`;
        span_arr.push(span);
        LETTER_COUNT++;
    })
    let spanned_text = span_arr.join('');
    View.set.id('article', spanned_text);
}

const check_typed_letter_and_calculate_stats = (event) => {
    let typed_letter;
    let letter_el;
    let text_letter;
    if (KEY_PRESSES == 1) {
        TYPING_START_TIME = Date.now();
        init_current_wpm_calc();
    }
    // console.log(event.key);
    if (CHECKED_LETTER_NUMBER < LETTER_COUNT) {
        event.preventDefault()
        typed_letter = event.key;
        letter_el = _id('letter_' + CHECKED_LETTER_NUMBER);
        text_letter = letter_el.innerHTML;
        if (typed_letter == text_letter) {
            letter_el.classList.remove('error');
            letter_el.classList.add('ok');
            CHECKED_LETTER_NUMBER++;
        } else {
            letter_el.classList.add('error');
            MISTAKES++;
        }
        KEY_PRESSES++;
        calculate_accuracy();
    } if (CHECKED_LETTER_NUMBER == LETTER_COUNT) {
        calculate_overall_wpm_and_completion_time();
        View.toggle.id('type_again_div');
        document.removeEventListener('keypress', check_typed_letter_and_calculate_stats);
    }
}

const init_current_wpm_calc = () => {
    setInterval(calculate_current_wpm, 3000);
}

const calculate_current_wpm = () => {
    let current_wpm = (KEY_PRESSES - KEY_PRESSES_BEFORE) / 5 / 0.05;
    View.set.id('current_wpm', Math.round(current_wpm));
    KEY_PRESSES_BEFORE = KEY_PRESSES;
}

const calculate_overall_wpm_and_completion_time = () => {
    let TYPING_FINISH_TIME = Date.now();
    let start_finish_diff = TYPING_FINISH_TIME - TYPING_START_TIME;
    let total_minutes = (start_finish_diff / 60000).toFixed(2);
    let total_wpm = KEY_PRESSES / 5 / total_minutes;
    let total_seconds = (start_finish_diff / 1000).toFixed(2);
    let minutes_to_display = 0;
    let seconds_to_display;
    if(total_seconds >= 60) {
        minutes_to_display = Math.floor(total_seconds / 60);
        seconds_to_display = (((total_seconds / 60) - minutes_to_display) *60).toFixed(2);
    } else {
        seconds_to_display = total_seconds;
    }
    View.set.id('overall_wpm', Math.round(total_wpm))
    View.set.id('completion_time', `${minutes_to_display}m ${seconds_to_display}s`);
}

const calculate_accuracy = () => {
    let accuracy = 100 - (MISTAKES / KEY_PRESSES * 100);
    View.set.id('accuracy', `${accuracy.toFixed(2)}%`);
}

const launch_type_session = () => document.addEventListener('keypress', check_typed_letter_and_calculate_stats)

// TODO required?
const set_full_window_height = () => {
    let footer_height = _id('footer_wrap').offsetHeight;
    if(document.body.scrollHeight < window.innerHeight + footer_height)
        document.body.style.height = window.innerHeight + 'px';
}

window.addEventListener('DOMContentLoaded', () => {
    if(IS_JS_TEXT) {
        // text_to_single_letters('txt');
        text_to_single_letters(get_random_text());
        launch_type_session();
        View.hide.id('another_own_text_btn');
    }
});

const View = {

    toggle: {

        id: (id) => _id(id).classList.toggle('hidden'),
        
        zen_mode: () => {
            let heading = _tag('h1')[0];
            heading.classList.toggle('hidden');
            View.toggle.id('nav_main');
            View.toggle.id('footer_wrap');
            View.show.stats();
            if(!IS_ZEN_MODE) {
                document.addEventListener('keydown', View._exit_zen_mode_on_escape);
                document.addEventListener('mousedown', View.toggle.zen_mode);
                IS_ZEN_MODE = true;
            } else {
                document.removeEventListener('keydown', View._exit_zen_mode_on_escape);
                document.removeEventListener('mousedown', View.toggle.zen_mode);
                IS_ZEN_MODE = false;
            }
        },        
    },

    hide: {
        id: (id) => _id(id).classList.add('hidden'),
        element: (el) => el.classList.add('hidden')
    },

    show: {
        id: (id) => _id(id).classList.add('hidden'),
    },

    set: {
        id: (id, text) => _id(id).innerHTML = text,
    },

    reset: {
        stats: () => {
            View.set.id('overall_wpm', '0');
            View.set.id('completion_time', '-');
            View.set.id('accuracy', `0.00%`);
        },
        letter_colors: () => {
            let letters = _id('article').getElementsByTagName('span');
            Array.from(letters).forEach(l => l.className = '')
        },
    },

    _exit_zen_mode_on_escape: (event) => {
        if(event.key == 'Escape') {
            View.toggle.zen_mode();
        }
    },
}

const type_own_text = () => {
    if (IS_OWN_TEXT) {
        let text_field = _id('own_text_field')
        let text = text_field.value;
        if (text.length > 0) {
            View.set.id('article', text)
            View.hide.element(text_field);
            View.toggle.id('type_btn');
            text_to_single_letters(text);
            launch_type_session();
        }
        View.hide.id('another_js_text_btn');
    }
}

const reset_view_for_next_js_text = () => {
    View.toggle.id('type_again_div');
    reset_counters_for_next_text();
    View.reset.stats();
    text_to_single_letters(get_random_text());
    launch_type_session();
}

const reset_for_retype = () => {
    reset_counters_for_retype();
    View.reset.letter_colors();
    View.reset.stats();
}

const type_again = () => {
    reset_for_retype();
    launch_type_session();
    View.toggle.id('type_again_div');
}

// min and max included 
const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const get_random_text = () => {
    let min = 0;
    // from texts.js
    let max = TEXTS.length - 1;
    return TEXTS[rnd(min, max)]
}
