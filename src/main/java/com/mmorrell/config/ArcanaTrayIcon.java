package com.mmorrell.config;

import java.awt.AWTException;
import java.awt.Image;
import java.awt.MenuItem;
import java.awt.PopupMenu;
import java.awt.SystemTray;
import java.awt.TrayIcon;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.net.URL;

import javax.swing.ImageIcon;

import com.google.common.io.Resources;
import com.mmorrell.ArcanaApplication;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import okhttp3.OkHttpClient;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ExitCodeGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.stereotype.Component;

@Slf4j
public class ArcanaTrayIcon extends TrayIcon {

    private static final String IMAGE_PATH = "static/img/brand/small-mage.png";
    private static final String TOOLTIP = "Arcana: Running";
    private PopupMenu popup;
    final SystemTray tray;

    public ArcanaTrayIcon() {
        super(createImage(IMAGE_PATH, TOOLTIP), TOOLTIP);
        popup = new PopupMenu();
        tray = SystemTray.getSystemTray();
        try {
            setup();
        } catch (AWTException e) {
            log.warn("Failed to create Tray Icon: " + e.getMessage());
        }
    }

    @PostConstruct
    private void setup() throws AWTException {
        // Create a pop-up menu components
        MenuItem exitItem = new MenuItem("Exit Arcana");
        popup.add(exitItem);
        exitItem.addActionListener(event -> {
            ExitCodeGenerator exitCodeGenerator = () -> 0;
            tray.remove(ArcanaTrayIcon.this);
            SpringApplication.exit(ArcanaApplication.context, exitCodeGenerator);
        });
        // popup.addSeparator();
        setPopupMenu(popup);
        tray.add(this);
    }

    protected static Image createImage(String path, String description) {
        byte[] imageData = new byte[0];
        try {
            imageData = Resources.toByteArray(Resources.getResource(IMAGE_PATH));
            log.info("Loaded image: " + path);
        } catch (IOException e) {
            log.error("Failed creating tray image: " + e.getMessage());
        }
        return new ImageIcon(imageData, description).getImage();
    }

}
