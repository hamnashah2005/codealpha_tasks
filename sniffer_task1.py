from scapy.all import sniff, IP, TCP, UDP, ICMP
import argparse
import sys

def process_packet(packet):
    """
    Callback function that processes each captured packet.
    """
    if IP in packet:
        ip_layer = packet[IP]
        src_ip = ip_layer.src
        dst_ip = ip_layer.dst
        protocol = ip_layer.proto
        
        # Determine protocol name
        proto_name = "Other"
        if protocol == 1:
            proto_name = "ICMP"
        elif protocol == 6:
            proto_name = "TCP"
        elif protocol == 17:
            proto_name = "UDP"

        # Print basic information
        print(f"\n[+] New Packet: {src_ip} -> {dst_ip} | Protocol: {proto_name}")

        # Check for TCP/UDP and print payload
        if TCP in packet or UDP in packet:
            try:
                # Raw payload data
                payload = bytes(packet[TCP].payload) if TCP in packet else bytes(packet[UDP].payload)
                if payload:
                    print(f"Payload Preview: {payload[:50]}...")
            except Exception as e:
                pass

def main():
    parser = argparse.ArgumentParser(description="Basic Network Sniffer")
    parser.add_argument("-i", "--interface", help="Network interface to sniff on (e.g., eth0, Wi-Fi)", default=None)
    parser.add_argument("-c", "--count", type=int, help="Number of packets to capture (0 for infinite)", default=0)
    args = parser.parse_args()

    print("Starting network sniffer... (Press Ctrl+C to stop)")
    try:
        sniff(iface=args.interface, prn=process_packet, store=False, count=args.count)
    except PermissionError:
        print("[-] Error: You need to run this script as Administrator/root to capture packets.")
        sys.exit(1)
    except Exception as e:
        print(f"[-] An error occurred: {e}")

if __name__ == "__main__":
    main()
