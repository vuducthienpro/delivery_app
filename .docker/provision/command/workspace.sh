FILE=/data/tmp/init.sh
if [ -f "$FILE" ]; then
    bash $FILE
fi
service cron start
crontab -u root /data/command/cron
bash -l