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
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import okhttp3.OkHttpClient;
import org.springframework.beans.BeansException;
import org.springframework.boot.ExitCodeGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

@Slf4j
public class ArcanaTrayIcon extends TrayIcon implements ApplicationContextAware {

    private ApplicationContext context;
    private static final String IMAGE_PATH = "static/img/brand/man-mage.png";
    private static final String TOOLTIP = "Running";
    private PopupMenu popup;
    final SystemTray tray;

    public ArcanaTrayIcon() {
        super(createImage(IMAGE_PATH, TOOLTIP), TOOLTIP);
        popup = new PopupMenu();
        tray = SystemTray.getSystemTray();
        try {
            setup();
        } catch (AWTException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }


    @PostConstruct
    private void setup() throws AWTException {
        // Create a pop-up menu components
        MenuItem exitItem = new MenuItem("Exit");
        popup.add(exitItem);
        exitItem.addActionListener(e -> {
            final int exitCode = 0;
            ExitCodeGenerator exitCodeGenerator = () -> exitCode;
            tray.remove(ArcanaTrayIcon.this);
            SpringApplication.exit(context, exitCodeGenerator);
        });
        // popup.addSeparator();
        setPopupMenu(popup);
        tray.add(this);


    }

    protected static Image createImage(String path, String description) {

        URL imageURL = Resources.getResource("static/img/brand/man-mage.png");
        byte[] imageData = new byte[0];
        try {
            imageData = Resources.toByteArray(Resources.getResource("static/img/brand/man-mage.png"));
            log.info("Loaded image: " + path);
        } catch (IOException e) {
            log.error("Failed creating tray image: " + e.getMessage());
        }
        return new ImageIcon(imageData, description).getImage();
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.context = applicationContext;
    }
}
