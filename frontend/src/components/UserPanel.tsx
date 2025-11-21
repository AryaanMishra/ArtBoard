import styles from './UserPanel.module.css';
import { User } from '../store';

interface UserPanelProps {
  users: Map<string, User>;
  currentUserId: string;
}

export const UserPanel: React.FC<UserPanelProps> = ({ users, currentUserId }) => {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731', '#5f27cd'];

  return (
    <div className={styles.panel}>
      <h3 className={styles.title}>👥 Users ({users.size})</h3>
      <div className={styles.userList}>
        {Array.from(users.entries()).map(([id, user], index) => (
          <div
            key={id}
            className={`${styles.userItem} ${id === currentUserId ? styles.currentUser : ''}`}
          >
            <div
              className={styles.colorIndicator}
              style={{ backgroundColor: colors[index % colors.length] }}
            ></div>
            <div className={styles.userInfo}>
              <div className={styles.username}>
                {user.username}
                {id === currentUserId && ' (you)'}
              </div>
              <div className={styles.tool} title={`Tool: ${user.activeTool}`}>
                {user.activeTool}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
