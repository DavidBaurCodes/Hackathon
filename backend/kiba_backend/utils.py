import logging
import openai
from langsmith.wrappers import wrap_openai
from langsmith import traceable
from kiba_backend.prompts import MAIN_PROMPT_DE, augment_user_data, augment_pflege_antrag, augment_summary_email
from kiba_backend.demo_user import demo_user_data
# Auto-trace LLM calls in-context
client = wrap_openai(openai.Client())
logger = logging.getLogger(__name__)


@traceable # Auto-trace this function
def pipeline(user_input: str):
    # print('>>>>PIPELINE>>>')
    # print(user_input)
    # print('<<<<PIPELINE<<<')
    result = client.chat.completions.create(
        messages=[{"role": "user", "content": user_input}],
        model="gpt-4o"
    )

    with open('/tmp/model_output.txt', "w") as text_file:
        text_file.write(result.choices[0].message.content)

    return result.choices[0].message.content

def process_conversation(conversation, actions, last_output=None):
    print("process_conversation (actions={})".format(actions))
    if not actions:
        return pipeline(MAIN_PROMPT_DE + '\n\n' + '...'.join(conversation))
    else:
        prompt = MAIN_PROMPT_DE
        for action in actions:
            if action == 'LOAD_CUSTOMER_DATA':
                prompt = augment_user_data(prompt)
            elif action == 'OPEN_PFLEGE_ANTRAG':
                prompt = augment_pflege_antrag(prompt)
            elif action == 'SEND_SUMMARY_EMAIL':
                prompt = augment_summary_email(prompt)
            else:
                logger.error('unrecognised action! {}'.format(action))
        print(prompt)
        return pipeline(prompt + '\n\n' + '...'.join(conversation))

def carry_out_HIL_action(action):
    if action == 'LOAD_CUSTOMER_DATA':
        return demo_user_data

    if action == 'OPEN_PFLEGE_ANTRAG':
        return [
        'Nachname des Kunden', 'Postleitzahl des Kunden',
        'Ort des Kunden', 'Straße des Kunden']
        return {
            'fields': [
            ['string', 'Nachname des Kunden'],
            ['string', 'Postleitzahl des Kunden'],
            ['string', 'Ort des Kunden'],
            ['string', 'Straße des Kunden'],
            ]
        }

    if action == 'SEND_EMAIL':
        return {
        'fields': [
        ['string', 'Zusammenfassung der Konversation']]
        }

    raise NotImplementedError('action="{}"'.format(action))
