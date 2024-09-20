package back.domain.user.dto;

import back.common.util.DateUtil;
import back.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

public class UserResponse {

    @Getter
    @AllArgsConstructor
    public static class Join {
        private Long id;
        private String email;

    }

    @Getter
    @AllArgsConstructor
    public static class Read {
        private Long id;
        private String nickname;
        private String email;
        private String profileImage;
        private int temperature;
    }

    @Getter
    @AllArgsConstructor
    public static class Update {
        private Long id;
        private String nickname;
        private String email;
        private String profileImage;
    }

    @Getter
    @AllArgsConstructor
    public static class ReadGathering {
        private Long id;
        private String gatheringName;
        private String gatheringOwner;
        private LocalDateTime startDate;
        private LocalDateTime endDate;
        private String month;
        private String time;
        private List<String> stacks;
        private String image;
        private String progress;
        private int totalCapacity;
        private int currentCapacity;
    }

    @Getter
    public static class Login {
        private Long id;
        private String username;
        private String nickname;
        private String accessToken;
        private String refreshToken;
        private boolean isFirstLogin;
        private String createdAt;

        public Login(User user, String accessToken, String refreshToken, boolean isFirstLogin) {
            this.id = user.getId();
            this.username = user.getEmail();
            this.nickname = user.getNickname();
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
            this.createdAt = DateUtil.toStringFormat(LocalDateTime.now());
            this.isFirstLogin = isFirstLogin;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Info{
        private Long id;
        private String nickname;
    }
}
