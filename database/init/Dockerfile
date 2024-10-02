FROM postgres:15

COPY schema.sql /schema.sql
COPY data.sql /data.sql
COPY init.sh /init.sh

RUN chmod +x /init.sh

CMD ["/init.sh"]