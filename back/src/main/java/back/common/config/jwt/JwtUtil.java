package back.common.config.jwt;

public interface JwtUtil {
    String SECRET = "coreal"; // HS256(대칭키)
    int EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7; // 일주일
    String TOKEN_PREFIX = "Bearer ";
    String Header = "Authorization";
}
