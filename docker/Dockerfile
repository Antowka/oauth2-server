FROM postgres:9.4
MAINTAINER Anton Nikanorov <anton@antowka.ru>

ADD install_java.sh /app/
ADD entry-point.sh /app/
#ADD ../build/libs/auth.jar /app/

WORKDIR /app/

RUN bash -c 'sh install_java.sh'
RUN bash -c 'touch auth.jar'

