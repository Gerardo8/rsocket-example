package com.example.rsocketserver;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ImageBanner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.core.io.FileSystemResource;
import org.springframework.integration.channel.PublishSubscribeChannel;
import org.springframework.integration.dsl.IntegrationFlow;
import org.springframework.integration.dsl.IntegrationFlows;
import org.springframework.integration.file.FileHeaders;
import org.springframework.integration.file.dsl.Files;
import org.springframework.integration.support.MessageBuilder;
import org.springframework.integration.transformer.GenericTransformer;
import org.springframework.messaging.Message;
import org.springframework.util.ReflectionUtils;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.PrintStream;

@SpringBootApplication
@RequiredArgsConstructor
public class RsocketServerApplication {

    private  final PublishSubscribeChannel publishSubscribeChannel;
    private final ObjectMapper objectMapper;

    @Bean
    IntegrationFlow fileIntegration(@Value("${/Users/glopezr/Desktop}") File in,
                                    Environment environment) {

        GenericTransformer<File, Message<GreetingsResponse>> fileStringGenericTransformer = (File source) -> {

            try (ByteArrayOutputStream baos = new ByteArrayOutputStream();
                 PrintStream printStream = new PrintStream(baos)) {
                final String jsonString = new String(baos.toByteArray());

                return MessageBuilder.withPayload(this.objectMapper.readValue(jsonString, GreetingsResponse.class))
                        .setHeader(FileHeaders.FILENAME, source.getAbsoluteFile().getName())
                        .build();
            } catch (IOException e) {
                ReflectionUtils.rethrowRuntimeException(e);
            }
            return null;
        };
        return IntegrationFlows
                .from(Files.inboundAdapter(in)
                                .autoCreateDirectory(true)
                                .preventDuplicates(true)
                                .patternFilter("*.json"),
                        poller -> poller.poller(pm -> pm.fixedRate(1000)))
                .transform(File.class, fileStringGenericTransformer)
                .channel(publishSubscribeChannel)
                .get();

    }

    public static void main(String[] args) {
        SpringApplication.run(RsocketServerApplication.class, args);
    }

}
