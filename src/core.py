'''
    Web server?
    This script should handle interaction with the frontend and retrieving appropriate data from the backend
'''

#@param[in] response is a JSON packet
import requests

def get_fb_token(app_id, app_secret):           
    payload = {'grant_type': 'client_credentials', 'client_id': app_id, 'client_secret': app_secret}
    file = requests.post('http://graph.facebook.com/oauth/access_token', auth=requests.auth.HTTPBasicAuth(app_id, app_secret))
    return file

print(get_fb_token('140402533263893', 'de632c313b3fcee74356efec4a496257'))
