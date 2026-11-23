#!/usr/bin/env python3
"""Regenerates Nepali_Tools_All_in_One.html from index.html + the tool files.
Run after editing any tool:  python3 build_all_in_one.py
To add a tool: add it to FILES below AND to TOOLS in index.html."""
import json, re, sys, pathlib
D = pathlib.Path(__file__).parent
FILES = {'font':'Nepali_Font_Converter_v4.html','rupees':'rupees-in-words.html','trip':'Trip_Expense_Splitter.html',
         'kharcha':'Kharcha_Tracker.html','bills':'Bills_Renewals_Tracker.html','medbox':'MedBox.html',
         'vehicle':'vehicle-tracker.html','todo':'To-Do Manager.html','units':'Engineering Unit Converter.html',
         'calendar':'final Nepali Calendar (BS_AD).html','fd':'FD_Manager_Nepal.html','agr':'Agreement Renewal Tracker.html','ins':'Insurance Policy Reminder.html'}
idx = (D/'index.html').read_text(encoding='utf-8')
ids = set(re.findall(r"^\s*\{id:'(\w+)'", idx, re.M))
if ids != set(FILES): sys.exit(f'Mismatch between TOOLS in index.html {sorted(ids)} and FILES {sorted(FILES)}')
back = re.compile(r'<a class="(?:bk|back)" href="index\.html">[^<]*</a>\s*')
bundle = {}
for k, fn in FILES.items():
    bundle[k] = back.sub('', (D/fn).read_text(encoding='utf-8'))
js = json.dumps(bundle, ensure_ascii=False).replace('</', '<\\/')
marker = '<script>\n/* To add a new tool'
assert marker in idx, 'marker not found in index.html'
out = idx.replace(marker, '<script>window.TOOL_HTML=' + js + ';</script>\n' + marker, 1)
out = out.replace("navigator.serviceWorker.register('sw.js')", "navigator.serviceWorker.register('sw.js')")
(D/'Nepali_Tools_All_in_One.html').write_text(out, encoding='utf-8')
print('Built Nepali_Tools_All_in_One.html', round(len(out)/1024), 'KB')
