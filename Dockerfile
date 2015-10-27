# here is where the build for generation name will come
FROM webratio/groovy

# run from /source
# get your chains from /source/chains
RUN mkdir -p /source/chains
RUN mkdir -p /source/static

COPY ./*.groovy /source/

COPY ./static/* /source/static/

EXPOSE 8080

CMD ["server.groovy"]

# maybe run
# docker run -d --name namegenerator -p 80:8080 -v "{path to wherever the markov-chains are}:/source/chains/" {whatever_name_you_gave_the_image}