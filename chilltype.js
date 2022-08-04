const _id = (id) => document.getElementById(id);
const _tag = (tag) => Array.from(document.getElementsByTagName(tag));


let LETTER_COUNT = 1;
let CHECKED_LETTER_NUMBER = 1;
let KEY_PRESSES = 0;
let KEY_PRESSES_BEFORE = 0;
let MISTAKES = 0;
let TYPING_START_TIME;
let IS_TYPING_ARTICLE = false;
let IS_ZEN_MODE = false;

const remove_multiple_spaces_from_text = (text) => {
    return text.replace(/\s{2,}/gm, ' ');
}

const text_to_single_letters = () => {
    let text = _id('article').innerHTML;
    text = remove_multiple_spaces_from_text(text);
    let text_arr = text.split('');
    let span_arr = [];
    text_arr.forEach(letter => {
        let span = `<span id='letter_${LETTER_COUNT}'>${letter}</span>`;
        span_arr.push(span);
        LETTER_COUNT++;
    })
    let spanned_text = span_arr.join('');
    _id('article').innerHTML = spanned_text;
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
        letter_el = _id('letter_' + CHECKED_LETTER_NUMBER)
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
        document.removeEventListener('keypress', check_typed_letter_and_calculate_stats);
    }
}

const init_current_wpm_calc = () => {
    setInterval(calculate_current_wpm, 3000);
}

const calculate_current_wpm = () => {
    let current_wpm = (KEY_PRESSES - KEY_PRESSES_BEFORE) / 5 / 0.05;
    _id('current_wpm').innerHTML = Math.round(current_wpm);
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
    _id('overall_wpm').innerHTML = Math.round(total_wpm);
    _id('completion_time').innerHTML = `${minutes_to_display}m ${seconds_to_display}s`;
}

const calculate_accuracy = () => {
    let accuracy = 100 - (MISTAKES / KEY_PRESSES * 100);
    _id('accuracy').innerHTML = `${accuracy.toFixed(2)}%`;
}

const launch_type_session = () => document.addEventListener('keypress', check_typed_letter_and_calculate_stats)

const set_full_window_height = () => {
    console.log("body: "+ document.body.scrollHeight)
    console.log("window: "+ window.innerHeight)
    if(document.body.scrollHeight < window.innerHeight)
        document.body.style.height = window.innerHeight + 'px';
}


window.addEventListener('DOMContentLoaded', () => {
    set_full_window_height();
    if(_id('stats') != null) {
        IS_TYPING_ARTICLE = true;
        text_to_single_letters();
        launch_type_session();
    }
});

const View = {

    toggle: {

        stats: () => {
            let stats_widget = _id('stats');
            stats_widget.classList.toggle('hidden');
        },

        zen_mode: () => {
            let nav = _id('nav_main');
            let footer = _id('footer');
            let content = _id('content');
            let heading = _tag('h1')[0];
            nav.classList.toggle('hidden');
            footer.classList.toggle('hidden');
            content.classList.toggle('flex');
            heading.classList.toggle('hidden');
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
        stats: () => _id('stats').classList.add('hidden'),
    },

    show: {
        stats: () => _id('stats').classList.add('hidden'),
    },

    _exit_zen_mode_on_escape: (event) => {
        if(event.key == 'Escape') {
            Toggle.zen_mode();
        }
    },

}
