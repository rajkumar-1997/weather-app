import { isIP } from 'net';

/**
 * Validates if the given IP is a public IP.
 * @param ip The IP address to validate.
 * @returns `true` if valid public IP, `false` otherwise.
 */
export function isValidPublicIp(ip: string): boolean {
  if (isIP(ip) === 0) {
    return false; // Invalid IP
  }

  // Check for private IP ranges
  const privateIpRanges = [
    /^10\./, // 10.0.0.0 - 10.255.255.255
    /^192\.168\./, // 192.168.0.0 - 192.168.255.255
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./, // 172.16.0.0 - 172.31.255.255
    /^127\./, // 127.0.0.0 - 127.255.255.255 (loopback)
    /^169\.254\./, // 169.254.0.0 - 169.254.255.255 (link-local)
    /^::1$/, // IPv6 loopback
    /^fc00:/, // IPv6 unique local
    /^fe80:/, // IPv6 link-local
  ];

  return !privateIpRanges.some((regex) => regex.test(ip));
}
